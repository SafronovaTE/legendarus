/* ПЕРЕМЕННЫЕ */
  let legendarusPower, //сила Легендаруса
      gladiatorsPower, //силы гладиаторов (HTML Collection)
      gladPower, //сила текущего в цикле гладиатора
      gladiatorsWeapon, //оружие гладиаторов (HTML Collection)
      gladWeapon; //оружие текущего в цикле гладиатора
/* ПЕРЕМЕННЫЕ end */

/* ФУНКЦИИ */
  // генерирует рандомное число в заданном диапазоне
  function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  // ведет лог игры
  function setGameLog(event) {
    let note = document.createElement('span');
    note.innerHTML = event+'<br>';
    document.querySelector('#log').appendChild(note);
  }

  // начальные параметры игры
  function beginGame() {
    // начальная сила Легендаруса
    legendarusPower = getRandomInt(1, 10);
    document.getElementById('legendarus-power').setAttribute('value', legendarusPower);

    // сила гладиаторов (проходка по HTML Collection через цикл)
    gladiatorsPower = document.getElementsByClassName('glad-power');
    for (let i=0; i < gladiatorsPower.length; i++) {
      gladPower = getRandomInt(1, 10);
      gladiatorsPower[i].setAttribute('value', gladPower);
    }

    // оружие гладиаторов (проходка по HTML Collection через цикл)
    gladiatorsWeapon = document.getElementsByClassName('glad-weapon');
    for (let i=0; i < gladiatorsWeapon.length; i++) {
      gladWeapon = getRandomInt(1, 3);
      gladiatorsWeapon[i].setAttribute('value', gladWeapon);
    }

    // очистить лог
    document.querySelector('#log').innerHTML = 'Для начала игры нажмите кнопку "В бой!"<br>';
  }

  // старт игры
  function startGame() {
    // очистить лог
    document.querySelector('#log').innerHTML = '';
    // через цикл проходим HTML Collection гладиаторов, сражаясь с каждым
    for (let j = 0; j < gladiatorsPower.length; j++) {
      // запись в переменные силы и оружия текущего гладиатора
      gladPower = +gladiatorsPower[j].value;
      gladWeapon = +gladiatorsWeapon[j].value;
      // игра
      setGameLog('Легендарус вступает в бой с гладиатором № ' + (j+1) + ';');
      setGameLog('Сила Легендаруса: ' + legendarusPower + ', сила гладиатора: ' + gladPower + '.');
      // если Легендарус слабее
      if (legendarusPower < gladPower) {
        setGameLog('Гладиатор № ' + (j+1) + ' сегодня силён как никогда. Легендарус проигрывает этот бой. Игра окончена.<hr>');
        setGameLog('Гладиатор № ' + (j+1) + ' является бесспорным победителем сегодняшнего чемпионата!');
        break;
        // если силы равны
      } else if (legendarusPower === gladPower) {
        setGameLog('Бойцы отчаянно сражаются, но их силы равны! Битва продолжается уже больше суток. В итоге оба воина, окончательно обессилев, падают замертво. Игра окончена.<hr>');
        setGameLog('В сегодняшнем чемпионате победителей нет.');
        break;
        // если Легендарус сильнее
      } else {
        // приплюсовываем к силе оружие гладиатора
        legendarusPower += gladWeapon;
        setGameLog('Гладиатор занимает оборонительную позицию, надеясь спастись, но Легендарус наносит сокрушительный удар. Легендарус одерживает победу в этом бою и в качестве трофея забирает оружие поверженного, увеличивая свои силы на ' + gladWeapon + ' единиц.<hr>');
        // если этот бой последний
        if (j === (gladiatorsPower.length - 1)) setGameLog('Легендарус одержал победу над всеми гладиаторами и является бесспорным победителем сегодняшнего чемпионата!');
      }
    }
  }
/* ФУНКЦИИ end */

/* ОСНОВНОЙ КОД */
  // установка начальных параметров игры
  beginGame();

  // событие на кнопку "В бой!"
  document.getElementById('start').onclick = startGame;

  // событие на кнопку "Начать заново"
  document.getElementById('begin').onclick = beginGame;
/* ОСНОВНОЙ КОД end */