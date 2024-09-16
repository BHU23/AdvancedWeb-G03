import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  images = [
    { imageUrl: 'https://www.takemetour.com/amazing-thailand-go-local/wp-content/uploads/2018/04/03-Lamai-Beach-Koh-Samui-1-e1525774776516.jpg' },
    { imageUrl: 'https://ik.imagekit.io/tvlk/blog/2024/04/7EVaSTlB-image9.png?tr=dpr-2,w-675' },
    { imageUrl: 'https://www.treehouse-villas.com/wp-content/uploads/2024/03/%E0%B8%94%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95-2.webp' },
    { imageUrl: 'https://res.klook.com/image/upload/q_85/c_fill,w_563/activities/lz5jf8kg4kfbiakkkvzc.jpg' },
    { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqjjQgXRlGwU_77KW_vsY_3up1HhY8z7VkA&s' },
  ];
}
