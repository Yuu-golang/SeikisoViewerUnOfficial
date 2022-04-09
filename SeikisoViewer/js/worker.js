/**
 * Worker�X���b�h�œ��삷�鏈���ł��B
 */
class WorkerMain {

  /**
   * �R���X�g���N�^�ł��B
   *
   * @param canvas ���C���X���b�h����n���ꂽOffscreenCanvas�I�u�W�F�N�g
   */
  constructor(canvas,commentsArray) {
    this.renderer = new HeavyRendering2D(canvas);

    this.render(commentsArray);
  };

  /**
   * �����_���[�̐ݒ���X�V���܂��B
   *
   * @param value ���C���X���b�h����n���ꂽ�X�V�v���p�e�B
   */
  update(value) {
    this.renderer.update(value);
  }

  /**
   * ��ʂ�`�悵�܂��B
   * ���ۂ̏����̓����_���[���s���܂��B
   */
  render(commentsArray) {
    this.renderer.render(commentsArray);

    requestAnimationFrame((commentsArray) => this.render(commentsArray));
  }
}

let workerMain = null;
// onmessage�C�x���g�n���h���[�Ń��C���X���b�h����̃��b�Z�[�W���󂯎��
onmessage = (event) => {
  // ���C���X���b�h����n���ꂽtype�ɉ����ď����𕪊�
  switch (event.data.type) {
    case 'init':
      // Worker�̏�����������
      workerMain = new WorkerMain(event.data.canvas);

      // �����_���[�̐ݒ���X�V
      workerMain.update(event.data.num);
      break;
    case 'update':
      // �����_���[�̐ݒ���X�V
      workerMain.update(event.data.num);
      break;
    default:
      break;
  }
};