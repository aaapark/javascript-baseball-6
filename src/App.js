import { MissionUtils } from "@woowacourse/mission-utils";
import Validation from "./Validation/index.js";
import { computerRandom } from "./Domain/computer.js";
import { checkingScore, playGame } from "./Domain/score.js";


class App {
  async play() {
    let willBeRestarted = true
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    while (willBeRestarted) {
      const computerInputNumber = computerRandom()

      let userWillRetry = true;
      while (userWillRetry) {
        const userNumberInput = await MissionUtils.Console.readLineAsync("숫자를 입력해주세요 : ").then((value) => value)
       
        // validation
        try {
          Validation.gameInputValidation(userNumberInput);
        } catch (e) {
          throw e
        }

        const arrayOfInput = Array.from(String(userNumberInput), Number);
        // console.log(arrayOfInput)
        // console.log(computerInputNumber)

        const {strike, ball} = checkingScore(computerInputNumber, arrayOfInput);
        playGame(strike,ball)

        // 스트라이크 갯수 체크해야함
        if (strike === 3) {
          userWillRetry = false;
        }

      }
      willBeRestarted = await this.isUserWillingToRestart("")
    }
  }
  
  async isUserWillingToRestart() {
    let restart = await MissionUtils.Console.readLineAsync('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.')
    .then((value) => value);
    if (restart === "1") {
      MissionUtils.Console.print("1번을 눌렀습니다. 게임을 재시작합니다.");
      return true;
    } else if (restart === "2") {
      MissionUtils.Console.print("2번을 눌렀습니다. 게임을 종료하겠습니다.");
      return false;
    } else {
      this.isUserWillingToRestart("잘못된 숫자를 입력하였습니다. ")
    }
  }

}


export default App;
