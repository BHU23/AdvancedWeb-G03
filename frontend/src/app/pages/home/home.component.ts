import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DecodedToken } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { ReviewService } from '../../services/review/review.service';
import { Router } from '@angular/router';

interface Place {
  _id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  category: string;
  rating: number;
  createAt: string;
  updateAt: string;
  placeID: number;
  __v: number;
}

interface Review {
  _id: string;
  topic: string;
  image: string;
  rating: number;
  description: string;
  trip_date: string;
  reviewDate: string;
  timeRecommend: string;
  cost: number;
  likeCount: number;
  view: number;
  placeID: Place;
  userID: string;
  createdAt: string;
  updatedAt: string;
  createAt: string;
  updateAt: string;
  reviewID: number;
  __v: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData: DecodedToken | null = null;
  topReviews: Review[] = [];

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

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserdata().subscribe((data) => {
      this.userData = data;
      console.log('userData', this.userData);
    });
    this.fetchTopReviews();
  }

  fetchTopReviews(): void {
    this.reviewService.getReviews().subscribe(
      (reviews: Review[]) => {
        // Sort reviews by popularity (likes + views)
        const sortedReviews = reviews.sort((a, b) =>
          (b.likeCount + b.view) - (a.likeCount + a.view)
        );

        // Get top 4 reviews
        this.topReviews = sortedReviews.slice(0, 4);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        // Handle error (e.g., show error message to user)
      }
    );
  }

  viewReviewDetails(reviewId: string): void {
    if (this.userData) {
      this.router.navigate(['/review', reviewId]);
    } else {
      this.showLoginPopup();
    }
  }

  handleClick(event: MouseEvent): void {
    if (!this.userData) {
      event.preventDefault(); // Prevent default anchor action
      this.showLoginPopup(); // Show login popup
    }
  }

  private showLoginPopup(): void {
    Swal.fire({
      title: 'ต้องการเข้าสู่ระบบ?',
      text: 'กรุณาเข้าสู่ระบบเพื่อเข้าถึงฟีเจอร์นี้',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'เข้าสู่ระบบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to login page or open login modal
        window.location.href = '/login'; // Change this if you want to open a modal instead
      }
    });
  }
}

