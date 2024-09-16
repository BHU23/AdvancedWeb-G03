import { Component } from '@angular/core';

interface TravelPlan {
  title: string;
  dateRange: string;
  budget: string;
  description: string;
  status: string;
  imageUrl: string;
}

@Component({
  selector: 'app-planing-list',
  templateUrl: './planing-list.component.html',
  styleUrl: './planing-list.component.css'
})
export class PlaningListComponent {
  travelPlans: TravelPlan[] = [
    {
      title: 'Travel Title 1',
      dateRange: '11-09-67 To 15-09-67',
      budget: '200k-300k Baht',
      description: 'Body text for whatever youd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.',
      status: 'Planned',
      imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png' // ตัวอย่าง URL รูปภาพ
    },
    {
      title: 'Travel Title 2',
      dateRange: '20-10-67 To 25-10-67',
      budget: '100k-150k Baht',
      description: 'Another travel plan description. This one without an image to demonstrate the placeholder.',
      status: 'Planning',
      imageUrl: 'https://image.makewebeasy.net/makeweb/m_1920x0/oDgJmY2kJ/DefaultData/%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%84%E0%B8%A3%E0%B9%88%E0%B9%80%E0%B8%A5%E0%B8%A2%E0%B9%8C_.png'
    },
    // เพิ่มข้อมูลตัวอย่างเพิ่มเติมตามต้องการ
  ];
}
