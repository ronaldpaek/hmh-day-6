const promptChoices = ["yell", "length", "numSum", "binary", "leet"];

function openModal(version) {
  if (version === 1) {
    document.getElementById("myModalV1").showModal();
  } else if (version === 2) {
    document.getElementById("myModalV2").showModal();
  }
}

function closeModal(version) {
  if (version === 1) {
    document.getElementById("myModalV1").close();
  } else if (version === 2) {
    document.getElementById("myModalV2").close();
  }
}

function executeChoice(version) {
  let choice;

  if (version === 1) {
    choice = document.getElementById("choiceV1").value;
  } else if (version === 2) {
    choice = document.getElementById("choiceV2").value;
  }

  actions[choice]();
  closeModal(version);
}

function yellV2() {
  const actionSection = document.getElementById("actionSection");
  actionSection.innerHTML = `
    <label for="word">Enter your word to yell:</label>
    <input type="text" id="word" />
    <button onclick="yellActionV2()">YellV2</button>
    <div id="word-result"></div>
  `;
  document.getElementById("word").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      yellActionV2();
    }
  });
}

function yellActionV2() {
  const word = document.getElementById("word").value;
  const wordResult = document.getElementById("word-result");
  wordResult.style.height = "50px";
  wordResult.textContent = word + ".toUpperCase()";
  wordResult.className = "yell-typing-effect";

  setTimeout(() => {
    wordResult.textContent = word.toUpperCase();
    wordResult.className = "yell-growing-effect";
  }, 1000);
}

function lengthV2() {
  const actionSection = document.getElementById("actionSection");
  actionSection.innerHTML = `
  <label for="word">Enter your word to calculate the number of characters:</label>
  <input type="text" id="word" />
  <button onclick="lengthActionV2()">Length</button>
  <div id="result-container">
    <div id="word-display"></div>
    <div id="arrow">^</div>
    <div id="char-count"></div>
    <div id="final-count" style="position: absolute; display: none;">0</div>
  </div>
  `;
  document.getElementById("word").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      lengthActionV2();
    }
  });
}

function lengthActionV2() {
  const finalCount = document.getElementById("final-count");
  finalCount.style.display = "none"; // Hide the final count
  const word = document.getElementById("word").value;
  const wordDisplay = document.getElementById("word-display");
  const arrow = document.getElementById("arrow");
  const charCount = document.getElementById("char-count");

  wordDisplay.innerHTML = word
    .split("")
    .map((c) => `<span class="char">${c}</span>`)
    .join("");
  arrow.style.left = "0";

  setTimeout(() => {
    wordDisplay.style.display = "block";
    arrow.style.display = "block";
    charCount.style.display = "block";
  }, 0);

  let index = 0;
  charCount.textContent = index + 1;
  const interval = setInterval(() => {
    if (index < word.length) {
      charCount.textContent = index + 1;
      const charWidth = 8;
      arrow.style.left = `${index * charWidth}px`;

      const chars = document.querySelectorAll(".char");
      chars[index].style.color = "purple";

      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        const finalCount = document.getElementById("final-count");
        finalCount.textContent = word.length;
        finalCount.style.fontSize = "32px";
        finalCount.style.display = "block";
        charCount.style.display = "none";
        wordDisplay.style.display = "none";
        arrow.style.display = "none";
      }, 500);
    }
  }, 500);
}

function binaryV2() {
  const actionSection = document.getElementById("actionSection");
  actionSection.innerHTML = `
    <label for="binary">Enter a binary word:</label>
    <input type="text" id="binary" />
    <button onclick="binaryActionV2()">Convert</button>
    <div id="binary-container">
      <div id="binary-display"></div>
      <div id="binary-arrow">^</div>
      <div id="binary-result">binary = {}</div>
    </div>
  `;
  document.getElementById("binary").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      binaryActionV2("binary");
    }
  });
}

function binaryActionV2() {
  const binaryWord = document.getElementById("binary").value;
  const binaryDisplay = document.getElementById("binary-display");
  const arrow = document.getElementById("binary-arrow");
  const binaryResult = document.getElementById("binary-result");
  binaryResult.style.fontSize = "13px";
  binaryResult.innerHTML = "";
  let binaryChars = document.querySelectorAll(".binary-char");
  binaryChars.forEach((char, index) => {
    let charWidth = char.getBoundingClientRect().width;
    arrow.style.left = charWidth * index + "px";
  });

  binaryDisplay.innerHTML = binaryWord
    .split("")
    .map((c) => `<span class="binary-char">${c}</span>`)
    .join("");
  binaryDisplay.style.display = "block";
  arrow.style.display = "block";

  let index = 0;
  let result = "";
  const charWidth = 8;
  needed;
  const interval = setInterval(() => {
    if (index < binaryWord.length) {
      const chars = document.querySelectorAll(".binary-char");
      const char = chars[index].textContent;

      if (char === "0" || char === "1") {
        chars[index].style.color = "purple";
        result += char;
        binaryResult.textContent = `binary = ${result}`;
      }

      arrow.style.left = `${index * charWidth}px`;
      index++;
    } else {
      clearInterval(interval);
      binaryDisplay.style.display = "none";
      arrow.style.display = "none";

      binaryResult.innerHTML = `<span class="binary-value">${result}</span>`;
      binaryResult.style.fontSize = "32px";
    }
  }, 500);
}

function numSumV2() {
  const actionSection = document.getElementById("actionSection");
  actionSection.innerHTML = `
    <label for="number">Enter a number:</label>
    <input type="number" id="number" />
    <button onclick="numSumActionV2()">Calculate</button>
    <div id="result-container">
      <div id="calculation"></div>
      <div id="calculation-result"></div>
    </div>
  `;
  document.getElementById("number").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      numSumActionV2();
    }
  });
}

function numSumActionV2() {
  const num = parseInt(document.getElementById("number").value, 10);
  const calculation = document.getElementById("calculation");
  const calculationResult = document.getElementById("calculation-result");
  let sum = 0;

  function changeCalculationText(text) {
    calculation.style.opacity = 0;
    setTimeout(() => {
      calculation.textContent = text;
      calculation.style.opacity = 1;
    }, 500);
  }

  function step(i) {
    setTimeout(() => {
      sum += i;
      changeCalculationText(`${sum - i} + ${i} = ${sum}`);

      if (i === num) {
        setTimeout(() => {
          calculation.style.display = "none";
          calculationResult.textContent = sum;
          calculationResult.style.display = "block";
          calculationResult.style.fontSize = "32px";
        }, 1000);
      }
    }, i * 1500);
  }

  calculation.style.display = "block";
  calculation.style.fontSize = "initial";
  changeCalculationText("Initial value: 0");
  calculationResult.style.display = "none";
  calculationResult.style.fontSize = "initial";

  for (let i = 1; i <= num; i++) {
    step(i);
  }
}

function leetV2() {
  const actionSection = document.getElementById("actionSection");
  actionSection.innerHTML = `
  <label for="leet">Enter a word:</label>
  <input type="text" id="leet" />
  <button onclick="leetActionV2()">Convert to leet</button>
  <div id="leet-container">
    <div id="leet-display"></div>
    <div id="leet-arrow">^</div>
    <div id="leet-result">leet = {}</div>
  </div>
  `;
  document.getElementById("leet").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      leetActionV2();
    }
  });
}

function leetActionV2() {
  const leetWord = document.getElementById("leet").value;
  const leetDisplay = document.getElementById("leet-display");
  const arrow = document.getElementById("leet-arrow");
  const leetResult = document.getElementById("leet-result");
  leetResult.style.fontSize = "13px";
  leetResult.style.fontWeight = "normal";

  const vowelMap = {
    a: "4",
    e: "3",
    i: "1",
    o: "0",
    u: "v",
  };

  leetDisplay.innerHTML = leetWord
    .split("")
    .map((c) => `<span class="leet-char">${c}</span>`)
    .join("");
  arrow.style.left = "0";
  leetDisplay.style.display = "block";
  arrow.style.display = "block";

  let index = 0;
  let result = "";
  const interval = setInterval(() => {
    if (index < leetWord.length) {
      const chars = document.querySelectorAll(".leet-char");
      const char = chars[index].textContent.toLowerCase();

      if (vowelMap[char]) {
        chars[index].style.color = "purple";
        result += vowelMap[char];
      } else {
        result += char;
      }

      leetResult.textContent = `leet = ${result}`;
      arrow.style.left = `${chars[index].offsetLeft}px`;
      index++;
    } else {
      clearInterval(interval);

      leetDisplay.style.display = "none";
      arrow.style.display = "none";

      setTimeout(() => {
        leetResult.style.fontSize = "32px";
        leetResult.style.fontWeight = "bold";
        leetResult.innerHTML = `<span class="leet-value">${result}</span>`;
      }, 500);
    }
  }, 500);
}

const yell = () => {
  const word = prompt("Enter your word to yell:");

  alert(word?.toUpperCase());
};

const length = () => {
  const word = prompt("Enter your word to calculate the number of characters:");
  let num = 0;

  while (word[num] !== undefined) {
    num++;
  }

  alert(`${word} has ${num} characters.`);
};

const binary = () => {
  const word = prompt("Enter string to filter for binary:");
  const wordArr = word?.split("");
  const binaryArr = wordArr?.filter((char) => char === "0" || char === "1");

  alert(binaryArr?.join(""));
};

const numSum = () => {
  const strNum = prompt(
    "Enter number to calculate the sum of all the numbers it contains:"
  );
  const num = Number(strNum);
  let sum = 0;

  for (let i = 0; i <= num; i++) {
    sum += i;
  }

  alert(sum);
};

const leet = () => {
  const vowelMap = {
    a: "4",
    e: "3",
    i: "1",
    o: "0",
    u: "v",
  };
  const word = prompt("Enter string to convert to leet:");
  const wordArr = word?.split("");
  const leetArr = wordArr?.map((char) =>
    vowelMap[char] ? vowelMap[char] : char
  );

  alert(leetArr?.join(""));
};

const actions = {
  yell,
  length,
  binary,
  numSum,
  leet,
  yellV2,
  lengthV2,
  binaryV2,
  numSumV2,
  leetV2,
};
