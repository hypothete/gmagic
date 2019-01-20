export default {
  commands: [
    {
      id: 12345,
      type: 'POLYGON',
      points: [
        64, 32, 96, 96, 32, 96
      ],
      color: 'blue'
    },
    {
      id: 12346,
      type: 'POLYGON',
      points: [
        32, 32, 96, 32, 64, 96
      ],
      color: 'red'
    }
  ],
  activeCommand: null,
  drawingMode: 'DRAW'
}