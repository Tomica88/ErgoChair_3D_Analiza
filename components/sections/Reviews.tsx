import React from 'react'
import Marquee from 'react-fast-marquee';
import ReviewCard from '../ReviewCard';

const reviews = [
  {
    name: "Stanko S.",
    imgSrc: "/assets/reviews/rev1.jpg",
    text: "Odlična izkušnja! Konfigurator je enostaven za uporabo in stol sem prilagodil popolnoma po svojih željah.",
    stars: 4.2
  },
  {
    name: "Ana J.",
    imgSrc: "/assets/reviews/rev2.jpg",
    text: "Super trgovina! Takoj vidiš, kaj dobiš. Stol sem sestavila sama, kot sem si ga zamislila.",
    stars: 4.9
  },
  {
    name: "Nataša L.",
    imgSrc: "/assets/reviews/rev3.jpg",
    text: "Vrhunska storitev! Pisarniški stol je udoben, izdelava hitra, spletna stran pa res uporabniku prijazna.",
    stars: 4.1
  },
  {
    name: "Alen G.",
    imgSrc: "/assets/reviews/rev4.jpg",
    text: "Profesionalna spletna trgovina s super funkcijo 3D prikaza. Stol sem sestavil brez težav in je čudovit!",
    stars: 4.7
  },
  {
    name: "Dominik M.",
    imgSrc: "/assets/reviews/rev5.jpg",
    text: "Končno trgovina, kjer vidiš, kaj kupuješ! 3D pogled res pomaga pri odločitvi.",
    stars: 4.9
  },
  {
    name: "Lea N.",
    imgSrc: "/assets/reviews/rev6.jpg",
    text: "Hitro, enostavno in zabavno! Prvič sem uporabljala ErgoChair in sem navdušena nad udobjem.",
    stars: 4.3
  },
  {
    name: "David B.",
    imgSrc: "/assets/reviews/rev7.jpg",
    text: "Izjemno zadovoljen! Stol sem si lahko prilagodil do potankosti, kar drugje ni možno.",
    stars: 4.8
  },
  {
    name: "Nuša K.",
    imgSrc: "/assets/reviews/rev8.jpg",
    text: "Kakovost in inovacija v enem! Trgovina ponuja odlično uporabniško izkušnjo. Priporočam!",
    stars: 4.4
  }
];

const Reviews = () => {
  return (
    <div id='reviews' className='container mx-auto my-32 pt-8'>
      <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-10'>
        <span className='animate-pulse'>/ </span>
        ocene
      </h2>
      <Marquee speed={25}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            imgSrc={review.imgSrc}
            text={review.text}
            stars={review.stars}
          />
        ))}
      </Marquee>
    </div>
  )
}

export default Reviews