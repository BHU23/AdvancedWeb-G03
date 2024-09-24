// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://api.example.com/profile'; // URL ของ API

  constructor(private http: HttpClient) { }

  // ฟังก์ชันสำหรับดึงข้อมูลโปรไฟล์
  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // ฟังก์ชันสำหรับอัพเดตข้อมูลโปรไฟล์
  updateProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, profileData);
  }
}
