import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  places = [
    {
      id: 1,
      name: 'Sunset Beach Resort',
      rating: 4.5,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 2,
      name: 'Mountain View Lodge',
      rating: 4.2,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 3,
      name: 'City Center Hotel',
      rating: 3.8,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 4,
      name: 'Lakeside Cabin',
      rating: 4.7,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 5,
      name: 'Desert Oasis Resort',
      rating: 4.0,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 6,
      name: 'Forest Retreat',
      rating: 4.3,
      image: 'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
