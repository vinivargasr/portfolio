import { AfterViewInit, Component, ChangeDetectorRef } from '@angular/core';
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

  showAbout = true; // sempre visível agora — o @if pode ser removido do HTML se quiser

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {

    // ── Timeline da seção Hero (pin + mask) ──────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home',
        start: 'top top',
        end: '+=175%',
        scrub: 1.2,
        pin: true,           // pineia APENAS o .home
        anticipatePin: 1,
        pinSpacing: true,    // empurra o .home2 para baixo enquanto o pin está ativo
      }
    });

    // Mask fecha
    tl.to('.home', {
      maskPosition: '50% 95%',
      WebkitMaskPosition: '50% 95%',
      maskSize: '15vw',
      ease: 'none'
    }, 0);

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

    // Flash branco
    tl.to('.flash', {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out'
    }, 0.3);

    gsap.from('.about-header', {
  scrollTrigger: {
    trigger: '.home2',
    start: 'top 75%',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
});

gsap.from('.about-content', {
  scrollTrigger: {
    trigger: '.home2',
    start: 'top 70%',
  },
  x: -50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
});

gsap.from('.skill-item', {
  scrollTrigger: {
    trigger: '.about-skills',
    start: 'top 80%',
  },
  y: 20,
  opacity: 0,
  stagger: 0.12,
  duration: 0.6,
  ease: 'power2.out',
});
  }
}