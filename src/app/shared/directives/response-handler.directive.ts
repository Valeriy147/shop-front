import { Directive, Input } from '@angular/core';


@Directive({
  selector: '[responseHandler]'
})
export class ResponseHandlerDirective {
  @Input() responseHandler!: any;
  private popup!: Element;

  ngOnChanges(): void {
    if (this.responseHandler) {
      let element = document.createElement('div');
      element.innerHTML = this.responseHandler.content;
      this.responseHandler.type === 'success' ?
        element.setAttribute("class", "popup-success") :
        element.setAttribute("class", "popup-error");

      document.body.appendChild(element);
      this.popup = element;
      this.responseHandler.type === 'success' ?
      setTimeout(() => {
        this.popup.remove()
      }, 1000) :
      setTimeout(() => {
        this.popup.remove()
      }, 4000);
    }
  }
}



