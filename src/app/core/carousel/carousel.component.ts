import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  id: string;
  src: string;
  link: string;
  title: string;
  description: string;
  class: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

  standalone: true,
  imports: [
    CommonModule
  ],
})
export class CarouselComponent implements OnInit {

  @Input() images: carouselImage[] = []
  @Input() indicators = true
  @Input() controls = true
  @Input() toRight = true
  @Input() autoSlide = false
  @Input() slideInterval = 3000 //default to 3 second
  @Input() display = 1 //display screen

  selectedIndex = 0
  _display = []
  _dot = []

  constructor() { }

  ngOnInit(): void {
    for (let d = 0; d < this.display; d++) {
      this._display.push(d)
    }
    for (let dot = 0; dot <= (this.images.length/this.display); dot++) {
      this._dot.push(dot)
    }

    if (this.autoSlide) {
      this.autoSlideImages()
    }
  }

  // changes slid in every 3 second
  autoSlideImages(): void {
    setInterval(() => {
      if (this.toRight) {
        this.onNextClick()
      }else {
        this.onPrevClick()
      }
    }, this.slideInterval);
  }

  //set index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1
    } else {
      this.selectedIndex--
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0
    } else {
      this.selectedIndex++
    }
  }

  openLink(uri){
    window.open(uri,"_blank")
  }


}
