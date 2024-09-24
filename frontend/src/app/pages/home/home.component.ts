import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; 
import { DecodedToken } from '../../services/auth/auth.service';
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData: DecodedToken | null = null;
  featuredDestinations: Destination[] = [
    {
      id: 1,
      name: 'เกาะสมุย',
      description: 'เกาะสวรรค์แห่งอ่าวไทย',
      imageUrl:
        'https://blog.amari.com/wp-content/uploads/2017/08/shutterstock_169949093.jpg',
    },
    {
      id: 2,
      name: 'เชียงใหม่',
      description: 'เมืองแห่งวัฒนธรรมล้านนา',
      imageUrl:
        'https://www.maehongsongreentravel.com/images/editor/Chiang%20Mai/%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg',
    },
    {
      id: 3,
      name: 'กรุงเทพมหานคร',
      description: 'มหานครแห่งความหลากหลาย',
      imageUrl:
        'https://www.b2hotel.com/wp-content/uploads/2023/01/Bangkok-1024x683.jpg',
    },
    {
      id: 4,
      name: 'ภูเก็ต',
      description: 'ไข่มุกแห่งอันดามัน',
      imageUrl:
        'https://blog.bangkokair.com/wp-content/uploads/2024/04/phuket-scaled.jpeg',
    },
  ];

  carouselItems = [
    {
      imageUrl:
        'https://travel.mthai.com/app/uploads/2014/12/814740-topic-ix-10.jpg',
      title: 'วัฒธรรมอันสวยงาม',
      text: 'เที่ยวชมสุดยอดวัฒนธรรมอันสวยงาม วัดที่สวยที่สุดในประเทศไทย',
    },
    {
      imageUrl:
        'https://thethaiger.com/wp-content/uploads/2023/07/thai-tourism.jpg',
      title: 'สถานที่ท่องเที่ยวสุดฮิต',
      text: 'ไปเที่ยวแล้วถ่ายรูปกันกับเพื่อนๆ และสาวๆ ของคุณ!',
    },
    {
      imageUrl:
        'https://www.wonderfulpackage.com/uploads/moxie/Article/Inbound/Content_Inbound/002_Article/002_Picture_Safe.jpg',
      title: 'เรียนรู้จากการท่องเที่ยว',
      text: 'ค้นหาแหล่งวัฒนธรรมโบราณอันสวยงาม ที่มีอยู่ในประเทศไทย',
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserdata().subscribe((data) => {
      this.userData = data; 
      console.log('userData', this.userData);
    });
  }
}

