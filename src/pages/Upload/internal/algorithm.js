export class GrowingPacker {
  fit(blocks) {
    let n
    let node
    let block
    let len = blocks.length
    let w = len > 0 ? blocks[0].w : 0
    let h = len > 0 ? blocks[0].h : 0
    this.root = { x: 0, y: 0, w: w, h: h }
    for (n = 0; n < len; n++) {
      block = blocks[n]
      if ((node = this.findNode(this.root, block.w, block.h))) {
        block.fit = this.splitNode(node, block.w, block.h)
      } else {
        block.fit = this.growNode(block.w, block.h)
      }
    }
  }
  findNode(root, w, h) {
    if (root.used) {
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h)
    } else if (w <= root.w && h <= root.h) {
      return root
    } else {
      return null
    }
  }
  splitNode(node, w, h) {
    node.used = true
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h }
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h }
    return node
  }
  growNode(w, h) {
    let canGrowDown = w <= this.root.w
    let canGrowRight = h <= this.root.h
    let shouldGrowRight = canGrowRight && this.root.h >= this.root.w + w
    let shouldGrowDown = canGrowDown && this.root.w >= this.root.h + h
    if (shouldGrowRight) {
      return this.growRight(w, h)
    } else if (shouldGrowDown) {
      return this.growDown(w, h)
    } else if (canGrowRight) {
      return this.growRight(w, h)
    } else if (canGrowDown) {
      return this.growDown(w, h)
    } else {
      return null
    }
  }
  growRight(w, h) {
    let node
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    }
    if ((node = this.findNode(this.root, w, h))) {
      return this.splitNode(node, w, h)
    } else {
      return null
    }
  }
  growDown(w, h) {
    let node
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down: { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    }
    if ((node = this.findNode(this.root, w, h))) {
      return this.splitNode(node, w, h)
    } else {
      return null
    }
  }
  output(blocks) {
    const newBlocks = [...blocks.map(v => ({ ...v }))]
    this.fit(newBlocks)
    const hLast = newBlocks.sort((a, b) => a.fit.x < b.fit.x)[0]
    const vLast = newBlocks.sort((a, b) => a.fit.y < b.fit.y)[0]
    const packerWidth = hLast.fit.x + hLast.fit.w
    const packerHeight = vLast.fit.y + vLast.fit.h
    return {
      w: packerWidth,
      h: packerHeight,
      blocks: newBlocks
    }
  }
}