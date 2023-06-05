import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import {
  CALIX_TOOLTIP_CLASS,
  CalixTooltipType,
  LIGHT_CLASS,
  POSITION_STYLES,
  TOOLTIP_ARROW_CLASS,
  TOOLTIP_CLASS,
} from '../config/calix-tooltip.config';
import { CalixTooltipEnum } from '../enum/calix-tooltip';

@Directive({
  selector: '[calixTooltip]',
})
export class CalixTooltipDirective implements OnInit {
  @Input('calixTooltip') text: string = ''; // texte à afficher dans le tooltip
  @Input() tooltipColor?: string = ''; // couleur personnalisé de background du tooltip
  @Input() tooltipType?: CalixTooltipType = 'light'; // autre couleur de background on utlisant le type `CalixTooltipType`
  @Input() tooltipPosition: CalixTooltipEnum = CalixTooltipEnum.Bottom; // position du tooltip (par défaut : Bottom)

  private tooltipElement!: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.createTooltipElement();
    this.setTooltipStyle();
  }

  /**
   *  ajout des classes à un élément HTML
   */
  private addClasses(element: HTMLElement, ...classes: string[]) {
    classes.forEach((className) => {
      this.renderer.addClass(element, className);
    });
  }

  /**
   * appliquer des styles à un élément HTML
   */
  private setStyles(element: HTMLElement, styles: { [key: string]: string }) {
    Object.entries(styles).forEach(([property, value]) => {
      this.renderer.setStyle(element, property, value);
    });
  }

  /**
   * creation du tooltip et on ajoute au DOM
   */
  private createTooltipElement() {
    // creation d'un div dédier au tooltip on ajoutant des class css et le text à afficher
    this.tooltipElement = this.renderer.createElement('div');
    this.addClasses(this.tooltipElement, TOOLTIP_CLASS, CALIX_TOOLTIP_CLASS);
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.text));

    // creation d'une goutte (flesh) au tooltip avec la classe correspondante pour gérer sa position
    const tooltipArrow = this.renderer.createElement('div');
    this.addClasses(tooltipArrow, TOOLTIP_ARROW_CLASS, this.tooltipPosition);
    this.renderer.appendChild(this.tooltipElement, tooltipArrow);

    // définition de la couleur du background du tooltip si on une couleur personnalisée est spécifiée
    this.setStyles(this.tooltipElement, {
      visibility: 'hidden',
      ...(this.tooltipColor && { 'background-color': this.tooltipColor }),
    });

    // l'ajout du tooltip au DOM
    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);
  }


  /**
   * applique les styles et la position au tooltip demander par le l'utilisateur
   */
  private setTooltipStyle() {
    // récupèration des dimensions de l'élément hôte et les styles de position correspondants à la position du tooltip
    const hostElementRect = this.elementRef.nativeElement.getBoundingClientRect();
    const positionStyle = POSITION_STYLES[this.tooltipPosition];

    // on ajoute les classes CSS de position au tooltip et on applique les styles de position au tooltip
    this.addClasses(this.tooltipElement, positionStyle.class);
    this.setStyles(this.tooltipElement, positionStyle.getStyle(hostElementRect));

    // Sélectionne la flèche du tooltip et on Ajoute la classe CSS de position à la flèche du tooltip
    const tooltipArrow = this.tooltipElement.querySelector(`.${TOOLTIP_ARROW_CLASS}`) as HTMLElement;
    this.addClasses(tooltipArrow, this.tooltipPosition);

    if (this.tooltipType) {
      this.addClasses(this.tooltipElement, LIGHT_CLASS);
      if (this.tooltipType !== LIGHT_CLASS) {
        this.tooltipElement.classList.remove(LIGHT_CLASS);
        this.addClasses(this.tooltipElement, this.tooltipType);
      }
    }
  }

  /**
   * affiche le tooltip lorsque la souris entre dans l'élément `mouseenter`
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.setStyles(this.tooltipElement, {
      visibility: 'visible',
    });
  }

  /**
   * masque le tooltip lorsque la souris quitte l'élément `mouseleave`
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    this.setStyles(this.tooltipElement, {
      visibility: 'hidden',
    });
  }
}
