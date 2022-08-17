import { Controller } from '@nestjs/common'
import { IpcInvoke } from '@doubleshot/nest-electron-ipc-transport'
import { ElectronService } from '@doubleshot/nest-electron'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly electronService: ElectronService,
  ) { }

  @IpcInvoke('msg')
  public async handleSendMsg(msg: string): Promise<string> {
    const { webContents } = this.electronService.getWindow()
    webContents.send('reply-msg', 'this is msg from webContents.send')
    return `The main process received your message: ${msg} at time: ${this.appService.getTime()}`
  }
}
