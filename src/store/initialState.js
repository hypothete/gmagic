export default {
  commands: [
    {
      id: 12346,
      name: 'Line',
      type: 'LINE',
      points: [
        32, 48, 96, 48, 32, 96
      ],
      colorId: 8
    },
    {
      id: 12345,
      name: 'Poly',
      type: 'POLYGON',
      points: [
        64, 32, 96, 96, 32, 96
      ],
      colorId: 1
    }
  ],
  activeCommand: null,
  drawingMode: 'DRAW'
}