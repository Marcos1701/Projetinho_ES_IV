import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // adicionando documentação do swagger
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      description: "Retorna a previsão do tempo",
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            example: '2021-10-01',
          },
          weekday: {
            type: 'string',
            example: 'Sexta-feira',
          },
          max: {
            type: 'number',
            example: 30,
          },
          min: {
            type: 'number',
            example: 20,
          },
          cloudiness: {
            type: 'number',
            example: 0,
          },
          rain: {
            type: 'number',
            example: 0,
          },
          rain_probability: {
            type: 'number',
            example: 0,
          },
          wind_speedy: {
            type: 'string',
            example: '10 km/h',
          },
          description: {
            type: 'string',
            example: 'Tempo limpo',
          },
          condition: {
            type: 'string',
            example: 'clear_day',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  
  })
  @Post('forecast')
  async getForecast(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getForecast(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a previsão do tempo atual',
    schema: {
      type: 'object',
      properties: {
        temp: {
          type: 'number',
          example: 30,
        },
        date: {
          type: 'string',
          example: '13-03-2024',
        },
        time: {
          type: 'string',
          example: '15:00',
        },
        condition_code: {
          type: 'string',
          example: '32',
        },
        description: {
          type: 'string',
          example: 'Tempo limpo',
        },
        currently: {
          type: 'string',
          example: 'dia',
        },
        cid: {
          type: 'string',
          example: 'BRXX0234',
        },
        city: {
          type: 'string',
          example: 'São Paulo',
        },
        img_id: {
          type: 'string',
          example: '32',
        },
        humidity: {
          type: 'number',
          example: 50,
        },
        cloudiness: {
          type: 'number',
          example: 0,
        },
        rain: {
          type: 'number',
          example: 0,
        },
        wind_speedy: {
          type: 'string',
          example: '10 km/h',
        },
        wind_direction: {
          type: 'number',
          example: 90,
        },
        wind_cardinal: {
          type: 'string',
          example: 'Leste',
        },
        sunrise: {
          type: 'string',
          example: '06:00',
        },
        sunset: {
          type: 'string',
          example: '18:00',
        },
        moon_phase: {
          type: 'string',
          example: 'Crescente',
        },
        condition_slug: {
          type: 'string',
          example: 'clear_day',
        },
        city_name: {
          type: 'string',
          example: 'São Paulo',
        },
        timezone: {
          type: 'string',
          example: 'America/Sao_Paulo',
        },
        forecast: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
                example: '13-03-2024',
              },
              weekday: {
                type: 'string',
                example: 'Sexta-feira',
              },
              max: {
                type: 'number',
                example: 30,
              },
              min: {
                type: 'number',
                example: 20,
              },
              cloudiness: {
                type: 'number',
                example: 0,
              },
              rain: {
                type: 'number',
                example: 0,
              },
              rain_probability: {
                type: 'number',
                example: 0,
              },
              wind_speedy: {
                type: 'string',
                example: '10 km/h',
              },
              description: {
                type: 'string',
                example: 'Tempo limpo',
              },
              condition: {
                type: 'string',
                example: 'clear_day',
              },
            },
          },
        },
        cref: {
          type: 'string',
          example: 'BRXX0234',
        },
      },
    },
  })

  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('current')
  async getCurrentWeather(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getCurrentWeather(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna informações sobre o nascer e o pôr do sol',
    schema: {
      type: 'object',
      properties: {
        sunrise: {
          type: 'string',
          example: '06:00',
        },
        sunset: {
          type: 'string',
          example: '18:00',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('sunrise-sunset')
  async getSunriseSunset(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getSunriseSunset(latitude, longitude);
  }


  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a fase da lua',
    schema: {
      type: 'string',
      example: 'Crescente',
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })


  @Post('moon-phase')
  async getMoonPhase(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getMoonPhase(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna o nome da cidade',
    schema: {
      type: 'string',
      example: 'Teresina',
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('city-name')
  async getCityName(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getCityName(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna o nome da cidade e o fuso horário',
    schema: {
      type: 'object',
      properties: {
        city_name: {
          type: 'string',
          example: 'Teresina',
        },
        timezone: {
          type: 'string',
          example: 'America/Fortaleza',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('city-timezone')
  async getCityTimezone(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getCityTimezone(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna o ícone referente ao clima',
    schema: {
      type: 'string',
      example: '32',
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })
  @Post('Weather-Icon')
  async getWeatherIcon(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getWeatherIcon(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })

  @ApiResponse({
    status: 200,
    description: 'Retorna a condição do tempo',
    schema: {
      type: 'string',
      example: 'clear_day',
    },
  })

  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('weather-condition')
  async getWeatherCondition(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getWeatherCondition(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a descrição do tempo',
    schema: {
      type: 'string',
      example: 'Tempo limpo',
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('weather-description')
  async getWeatherDescription(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getWeatherDescription(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a temperatura',
    schema: {
      type: 'number',
      example: 30,
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })


  @Post('weather-temperature')
  async getWeatherTemperature(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getTemperature(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a umidade',
    schema: {
      type: 'number',
      example: 50,
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('weather-humidity')
  async getWeatherHumidity(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getHumidity(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a velocidade do vento',
    schema: {
      type: 'string',
      example: '10 km/h',
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })


  @Post('weather-wind-speed')
  async getWeatherWindSpeed(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getWindSpeed(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a quantidade de chuva',
    schema: {
      type: 'number',
      example: 0,
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })


  @Post('weather-rain')
  async getWeatherRain(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getRain(latitude, longitude);
  }

  @ApiBody({
    schema: {
      type: 'object',
      description: 'Latitude e Longitude do usuario',
      properties: {
        latitude: {
          type: 'number',
          example: -23.682,
        },
        longitude: {
          type: 'number',
          example: -46.875,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna a quantidade de nuvens',
    schema: {
      type: 'number',
      example: 0,
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      type: 'string',
      example: 'Latitude and longitude are required',
    },
  })

  @Post('weather-Cloudiness')
  async getWeatherCloudiness(
    @Body() { latitude, longitude }: { latitude: number; longitude: number}
  ) {
    if (
      (!latitude || !longitude 
      || latitude < -90 || latitude > 90
      || longitude < -180 || longitude > 180
      || isNaN(latitude) || isNaN(longitude)
      )
      ) {
      return 'Latitude and longitude are required';
    }

    return await this.appService.getCloudiness(latitude, longitude);
  }
}
