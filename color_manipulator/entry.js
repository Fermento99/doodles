class Entry {
  static HEIGHT = 60;
  static WIDTH = 600;

  constructor({label='', color = '#FFF', offset = 0}) {
    this.label = label;
    this.color = color;
    this.offset = offset;
  }

  draw(ctx) {
    ctx.textAlign = 'center';
    ctx.font = '15px monospace';
    ctx.fillStyle = '#000';
    ctx.fillText(this.label, Entry.WIDTH/4, Entry.HEIGHT*this.offset + Entry.HEIGHT/2 + 12.5, (Entry.WIDTH/2) - (Entry.HEIGHT/2)) 
    ctx.fillStyle = this.color;
    ctx.fillRect(Entry.WIDTH/2, Entry.HEIGHT*this.offset, Entry.WIDTH/2, Entry.HEIGHT);
    ctx.fillStyle = this.luminecense() > 0.5 ? '#000' : '#FFF';
    ctx.fillText(this.color, 3*Entry.WIDTH/4, Entry.HEIGHT*this.offset + Entry.HEIGHT/2 + 12.5, (Entry.WIDTH/2) - (Entry.HEIGHT/2)) 
  }

  luminecense() {
    return (0.299 * parseInt(this.color.slice(1,3), 16) + 0.587 * parseInt(this.color.slice(3,5), 16) + 0.114 * parseInt(this.color.slice(5,7), 16))/255;
  }
}