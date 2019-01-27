export default {
  commands: [
    {
      id: 12345,
      name: 'Background',
      type: 'POLYGON',
      points: [
        0, 0, 127, 0, 127, 127, 0, 127
      ],
      colors: [6,7],
      pattern: [
        true, true, false, false,
        true, true, false, false,
        false, false, true, true,
        false, false, true, true
      ]
    }
  ],
  activeCommand: null,
  drawingMode: 'EDIT_POINTS',
  modalOpen: true
}