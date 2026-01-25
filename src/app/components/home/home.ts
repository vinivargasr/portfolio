import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  ngAfterViewInit(): void {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    // Fundo — zoom cinematográfico
    tl.to('.home-fundo', {
      scale: 1.08,
      ease: 'none'
    }, 0);

    // PNG — zoom levemente maior
    tl.to('.home-png', {
      scale: 1.1,
      ease: 'none'
    }, 0);

    // Texto sai suavemente
    tl.to('.home-txt', {
      opacity: 0,
      y: 30,
      ease: 'none'
    }, 0);
  }
}
