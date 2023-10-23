import { MissionUtils } from "@woowacourse/mission-utils";



// 사용자 입력값 받아오기
class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    const userInput = await new Promise((resolve, reject) => {
      try {
        MissionUtils.Console.readLine('숫자를 입력해주세요', (answer) => {
          resolve(answer)
        })
      } catch (e) {
        reject(e)
      }
    })
    const vaildationChecker = userInput
    Validation.checkUserInput(vaildationChecker);

    }

  }


const app = new App();
app.play();

export default App;