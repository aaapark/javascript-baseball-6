import { MissionUtils } from "@woowacourse/mission-utils";
import {computerRandom} from './calculator/Computer.js'
import Validation from "./calculator/Validation.js";
import { checkingScore, playGame } from "./calculator/Score.js";

class App {
    async play() {
      const answer = computerRandom();

      let userWillRetry = true;
      while (userWillRetry) {
        const arrayOfInput = await this.makeUserInput()
        const {strike,ball} = checkingScore(answer, arrayOfInput)
        playGame(strike,ball)
        // console.log(answer)

        if (strike === 3) {
          userWillRetry = false;
        } 
      }
    }

    async makeUserInput() {
      const inputNumber = await MissionUtils.Console.readLineAsync('숫자를 입력해주세요 : ').then(
        (value) => value
      )
      try {
        Validation.gameInputValidation(inputNumber);
      } catch(e) {
        throw e
      } 
      const arrayOfInput = Array.from(String(inputNumber),Number);
      return arrayOfInput;
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
};



const app = new App()
app.play()

export default App;