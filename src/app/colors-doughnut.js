import * as echarts from 'echarts';
export const ENERGY_COLORS = {
  solar: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#FDC830' },
    { offset: 1, color: '#F37335' }
  ]),

  grid: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#00D2FF' },
    { offset: 1, color: '#3A7BD5' }
  ]),

  battery: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#11998E' },
    { offset: 1, color: '#38EF7D' }
  ]),

  dg: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#667EEA' },
    { offset: 1, color: '#764BA2' }
  ]),

  wind: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#36D1DC' },
    { offset: 1, color: '#5B86E5' }
  ])
};