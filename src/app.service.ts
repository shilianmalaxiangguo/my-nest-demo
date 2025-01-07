import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!'
  }

  // 添加示例 HTTP 请求方法
  async fetchExternalData() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://api.example.com/data')
      )
      return data
    }
    catch (error) {
      throw error
    }
  }

  // POST 请求示例
  async createExternalResource(payload: any) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('https://api.example.com/resource', payload)
      )
      return data
    }
    catch (error) {
      throw error
    }
  }
} 