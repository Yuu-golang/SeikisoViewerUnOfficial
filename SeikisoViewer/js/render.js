// Worker�ł̏����ɕK�v�ȊO���X�N���v�g��ǂݍ���
importScripts('render.js');

/**
 * Canvas�Ƀ����_�����O���s�������ł��B
 * ���C��/Worker�ǂ���̃X���b�h����ł��g�p�ł���悤�ɂȂ��Ă��܂��B
 */
class HeavyRendering2D {

  /**
   * �R���X�g���N�^�ł��B
   *
   * @param canvas Canvas�I�u�W�F�N�g�A��������OffscreenCanvas�I�u�W�F�N�g
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.globalCompositeOperation = 'lighter';
    this.stageWidth = this.canvas.width;
    this.stageHeight = this.canvas.height;
    this.particleList = [];
  };

  /**
   * �p�[�e�B�N�������������܂��B
   *
   * @param num �p�[�e�B�N����
   */
  initParticleList(num) {
    this.particleList = [];

    const SPEED = 5;
    for (let i = 0; i < num; i++) {
      const vr = Math.PI * 2 * Math.random();
      this.particleList.push(
        {
          x: this.stageWidth * Math.random(),
          y: this.stageHeight * Math.random(),
          vx: SPEED * Math.cos(vr),
          vy: SPEED * Math.sin(vr),
          color: `hsl(${Math.floor(360 * Math.random())}, 70%, 40%)`
        }
      );
    }
  }

  /**
   * �����_���[�̐ݒ���X�V���܂��B
   *
   * @param value �X�V�v���p�e�B
   */
  update(value) {
    this.initParticleList(value);
  }

  /**
   * ��ʂ�`�悵�܂��B
   */
  render(commentsArray) {
    this.drawPraticle(commentsArray);
  }

 drawPraticle(commentsArray) {
    var st = (new Date()).getTime(); //��
    if (0 != $('#commentDiv3').length && null != canvasInfo) {
    	try{
	        //clearCanvas();
		    this.context.clearRect(0, 0, 1920, 1080);
	        
	        var p = 0;
	        
	        for (var i in commentsArray) {
	            var commentInfo = commentsArray[i];
	            this.context.strokeText(commentInfo.comment, canvasInfo.canvasWidth - commentInfo.left, commentInfo.top);
	            this.context.fillText(commentInfo.comment, canvasInfo.canvasWidth - commentInfo.left, commentInfo.top);

	            var m = commentInfo.moveWidth * 2 * timeRatio;
	            commentInfo.left += m;
	        }
	        
		}catch(e){
			console.log(e);
		}
	}
 }
	
	/*
  drawPraticle() {
    this.context.clearRect(0, 0, this.stageWidth, this.stageHeight);

    const length = this.particleList.length;
    for (let i = 0; i < length; i++) {
      const particle = this.particleList[i];

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.stageWidth) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.stageHeight) {
        particle.vy *= -1;
      }

      this.context.beginPath();
      this.context.fillStyle = particle.color;
      this.context.arc(particle.x, particle.y, 2, 0, Math.PI * 2, false);
      this.context.fill();
      this.context.closePath();
    }
  }
  */
}

// HeavyRendering2D�N���X���X�R�[�v�ɓW�J����B
// self�̓��C���X���b�h�ł�Window�AWorker�X���b�h�ł�DedicatedWorkerGlobalScope�ɂȂ�
self.HeavyRendering2D = HeavyRendering2D;