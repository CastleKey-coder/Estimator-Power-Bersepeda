    function number(id) {
      const val = parseFloat(document.getElementById(id).value.toString().replace(',', '.'));
      return Number.isFinite(val) ? val : 0;
    }

    function setVal(id, value) {
      document.getElementById(id).value = value;
    }

    function fmt(n, digit = 0) {
      return Number(n).toLocaleString('id-ID', { maximumFractionDigits: digit, minimumFractionDigits: digit });
    }

    function parseTimeToHours(timeString) {
      const parts = timeString.trim().split(':').map(Number);
      if (parts.some(part => !Number.isFinite(part))) return 0;
      if (parts.length === 3) return parts[0] + (parts[1] / 60) + (parts[2] / 3600);
      if (parts.length === 2) return parts[0] + (parts[1] / 60);
      if (parts.length === 1) return parts[0];
      return 0;
    }

    function calculateSpeedFromDistanceTime() {
      const distance = number('distance');
      const hours = parseTimeToHours(document.getElementById('time').value);
      if (distance > 0 && hours > 0) {
        setVal('speed', (distance / hours).toFixed(2));
        calculatePower();
      } else {
        alert('Isi jarak dan moving time dengan format yang benar, misalnya 01:30:24.');
      }
    }

    function calculateGradeFromElevation() {
      const elevGain = number('elevGain');
      const distanceKm = number('distance');
      if (distanceKm > 0) {
        const grade = (elevGain / (distanceKm * 1000)) * 100;
        setVal('grade', grade.toFixed(2));
        calculatePower();
      } else {
        alert('Isi jarak ride lebih dulu.');
      }
    }

    function applyPositionPreset() {
      const preset = document.getElementById('positionPreset').value;
      if (preset !== 'custom') setVal('cda', preset);
      calculatePower();
    }

    function applySurfacePreset() {
      const preset = document.getElementById('surfacePreset').value;
      if (preset !== 'custom') setVal('crr', preset);
      calculatePower();
    }

    function applyGearText() {
      const gearText = document.getElementById('gearText').value.trim();
      const match = gearText.match(/(\d+(?:[.,]\d+)?)\s*[/xX:-]\s*(\d+(?:[.,]\d+)?)/);
      if (match) {
        setVal('chainring', match[1].replace(',', '.'));
        setVal('cog', match[2].replace(',', '.'));
      }
      calculatePower();
    }

    function applyFramePreset() {
      const preset = document.getElementById('bikeFramePreset').value;
      if (preset !== 'custom') setVal('frameSizeCm', preset);
      calculatePower();
    }

    function applyWheelSizePreset() {
      const preset = document.getElementById('wheelSizePreset').value;
      if (preset !== 'custom') setVal('wheelCircumference', preset);
      calculatePower();
    }

    function gcd(a, b) {
      a = Math.abs(Math.round(a));
      b = Math.abs(Math.round(b));
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a || 1;
    }

    function getSelectedOptionText(id) {
      const el = document.getElementById(id);
      return el.options[el.selectedIndex] ? el.options[el.selectedIndex].text : '-';
    }

    function applySatriaPreset() {
      setVal('distance', '50');
      setVal('time', '01:30:24');
      setVal('speed', '33.19');
      setVal('riderMass', '60');
      setVal('bikeMass', '7.6');
      setVal('elevGain', '128');
      setVal('grade', '0.26');
      setVal('gearText', '52/15');
      setVal('chainring', '52');
      setVal('cog', '15');
      document.getElementById('bikeFramePreset').value = '54';
      setVal('frameSizeCm', '54');
      document.getElementById('wheelSizePreset').value = '2.105';
      setVal('wheelCircumference', '2.105');
      document.getElementById('positionPreset').value = '0.32';
      setVal('cda', '0.32');
      document.getElementById('surfacePreset').value = '0.005';
      setVal('crr', '0.005');
      setVal('headwind', '0');
      setVal('temp', '25');
      setVal('altitude', '80');
      setVal('efficiency', '97');
      setVal('startSpeed', '0');
      setVal('endSpeed', '0');
      setVal('accelTime', '0');
      calculatePower();
    }

    function resetForm() {
      applySatriaPreset();
    }

    function estimateAirDensity(tempC, altitudeM) {
      const tempK = tempC + 273.15;
      const p0 = 101325;
      const lapse = 0.0065;
      const t0 = 288.15;
      const exponent = 5.25588;
      const pressure = p0 * Math.pow(Math.max(0.01, 1 - (lapse * altitudeM / t0)), exponent);
      const rSpecific = 287.05;
      return pressure / (rSpecific * tempK);
    }

    function setBar(id, value, totalAbs) {
      const percent = totalAbs > 0 ? Math.min(100, Math.abs(value) / totalAbs * 100) : 0;
      document.getElementById(id).style.width = percent + '%';
    }

    function calculatePower() {
      const g = 9.8067;
      const riderMass = number('riderMass');
      const bikeMass = number('bikeMass');
      const totalMass = riderMass + bikeMass;
      const speedKmh = number('speed');
      const vGround = speedKmh / 3.6;
      const gradePct = number('grade');
      const theta = Math.atan(gradePct / 100);
      const cda = number('cda');
      const crr = number('crr');
      const headwindKmh = number('headwind');
      const vAir = Math.max(0, (speedKmh + headwindKmh) / 3.6);
      const temp = number('temp');
      const altitude = number('altitude');
      const rho = estimateAirDensity(temp, altitude);
      const efficiency = Math.max(1, Math.min(100, number('efficiency'))) / 100;

      const pAero = 0.5 * rho * cda * Math.pow(vAir, 2) * vGround;
      const pRoll = crr * totalMass * g * Math.cos(theta) * vGround;
      const pGravity = totalMass * g * Math.sin(theta) * vGround;

      const startV = number('startSpeed') / 3.6;
      const endV = number('endSpeed') / 3.6;
      const accelTime = number('accelTime');
      let pAccel = 0;
      if (accelTime > 0 && endV > startV) {
        pAccel = 0.5 * totalMass * (Math.pow(endV, 2) - Math.pow(startV, 2)) / accelTime;
      }

      const wheelPowerRaw = pAero + pRoll + pGravity + pAccel;
      const wheelPower = Math.max(0, wheelPowerRaw);
      const pedalPower = wheelPower / efficiency;
      const drivetrainLoss = Math.max(0, pedalPower - wheelPower);
      const wkg = riderMass > 0 ? pedalPower / riderMass : 0;

      const chainring = number('chainring');
      const cog = number('cog');
      const wheelCircumference = number('wheelCircumference');
      const gearRatio = cog > 0 ? chainring / cog : 0;
      const rollout = gearRatio * wheelCircumference;
      const cadence = rollout > 0 ? (vGround * 60) / rollout : 0;
      const skidPatches = chainring > 0 && cog > 0 ? Math.round(cog / gcd(chainring, cog)) : 0;
      const gearText = document.getElementById('gearText').value.trim() || (chainring > 0 && cog > 0 ? `${fmt(chainring, 0)}/${fmt(cog, 0)}` : '-');
      const frameSize = number('frameSizeCm');
      const framePreset = document.getElementById('bikeFramePreset').value;
      const frameLabel = framePreset === 'custom' ? `${fmt(frameSize, 1)} cm` : getSelectedOptionText('bikeFramePreset');
      const wheelPreset = document.getElementById('wheelSizePreset').value;
      const wheelLabel = wheelPreset === 'custom' ? `Custom ${fmt(wheelCircumference, 3)} m` : getSelectedOptionText('wheelSizePreset');

      const hours = parseTimeToHours(document.getElementById('time').value);
      const seconds = hours * 3600;
      const mechKj = seconds > 0 ? (pedalPower * seconds) / 1000 : 0;
      const metabolicKcal = mechKj > 0 ? mechKj / (4.184 * 0.24) : 0;

      const totalAbs = Math.abs(pAero) + Math.abs(pRoll) + Math.abs(pGravity) + Math.abs(pAccel);

      document.getElementById('totalPower').textContent = fmt(pedalPower, 0);
      document.getElementById('wkg').textContent = fmt(wkg, 2);
      document.getElementById('wheelPower').textContent = fmt(wheelPower, 0) + ' W';
      document.getElementById('lossPower').textContent = fmt(drivetrainLoss, 0) + ' W';
      document.getElementById('airDensity').textContent = fmt(rho, 3) + ' kg/m³';
      document.getElementById('mechanicalWork').textContent = fmt(mechKj, 0) + ' kJ';
      document.getElementById('metabolicKcal').textContent = fmt(metabolicKcal, 0) + ' kcal';
      document.getElementById('gearUsedOut').textContent = gearText;
      document.getElementById('gearRatioOut').textContent = fmt(gearRatio, 2);
      document.getElementById('rolloutOut').textContent = fmt(rollout, 2) + ' m';
      document.getElementById('cadenceOut').textContent = fmt(cadence, 0) + ' rpm';
      document.getElementById('skidPatchesOut').textContent = skidPatches > 0 ? skidPatches + ' titik' : '-';
      document.getElementById('bikeSetupOut').textContent = `${frameLabel} / ${wheelLabel}`;

      document.getElementById('aeroVal').textContent = fmt(pAero, 0) + ' W';
      document.getElementById('rollVal').textContent = fmt(pRoll, 0) + ' W';
      document.getElementById('gravVal').textContent = fmt(pGravity, 0) + ' W';
      document.getElementById('accelVal').textContent = fmt(pAccel, 0) + ' W';
      setBar('aeroBar', pAero, totalAbs);
      setBar('rollBar', pRoll, totalAbs);
      setBar('gravBar', pGravity, totalAbs);
      setBar('accelBar', pAccel, totalAbs);

      const largest = [
        ['aerodinamika', Math.abs(pAero)],
        ['rolling resistance', Math.abs(pRoll)],
        ['tanjakan/gravitasi', Math.abs(pGravity)],
        ['akselerasi', Math.abs(pAccel)]
      ].sort((a, b) => b[1] - a[1])[0][0];

      const interpretation = `Estimasi power di pedal sekitar ${fmt(pedalPower, 0)} W atau ${fmt(wkg, 2)} W/kg. Komponen terbesar pada setelan ini adalah ${largest}. Dengan gear ${gearText}, rollout sekitar ${fmt(rollout, 2)} m dan cadence estimasi ${fmt(cadence, 0)} rpm pada kecepatan ${fmt(speedKmh, 2)} km/jam.`;
      document.getElementById('interpretation').textContent = interpretation;

      const result = [
        `Estimasi power: ${fmt(pedalPower, 0)} W`,
        `W/kg: ${fmt(wkg, 2)}`,
        `Gear digunakan: ${gearText}`,
        `Gear ratio: ${fmt(gearRatio, 2)}`,
        `Rollout: ${fmt(rollout, 2)} m`,
        `Cadence estimasi: ${fmt(cadence, 0)} rpm`,
        `Skid patches: ${skidPatches > 0 ? skidPatches + ' titik' : '-'}`,
        `Ukuran sepeda: ${frameLabel}`,
        `Ukuran roda/ban: ${wheelLabel}`,
        `Wheel power: ${fmt(wheelPower, 0)} W`,
        `Aero: ${fmt(pAero, 0)} W`,
        `Rolling: ${fmt(pRoll, 0)} W`,
        `Gravity: ${fmt(pGravity, 0)} W`,
        `Acceleration: ${fmt(pAccel, 0)} W`,
        `Drivetrain loss: ${fmt(drivetrainLoss, 0)} W`,
        `Mechanical work: ${fmt(mechKj, 0)} kJ`,
        `Metabolic estimate: ${fmt(metabolicKcal, 0)} kcal`
      ].join('\n');
      document.getElementById('resultText').textContent = result;
    }

    async function copyResult() {
      const text = document.getElementById('resultText').textContent;
      try {
        await navigator.clipboard.writeText(text);
        alert('Hasil berhasil disalin.');
      } catch (err) {
        alert('Browser tidak mengizinkan salin otomatis. Silakan blok teks hasil lalu copy manual.');
      }
    }

    document.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('input', () => {
        if (el.id === 'cda') document.getElementById('positionPreset').value = 'custom';
        if (el.id === 'crr') document.getElementById('surfacePreset').value = 'custom';
        if (el.id === 'wheelCircumference') document.getElementById('wheelSizePreset').value = 'custom';
        if (el.id === 'frameSizeCm') document.getElementById('bikeFramePreset').value = 'custom';
        if (el.id === 'chainring' || el.id === 'cog') {
          const chainring = number('chainring');
          const cog = number('cog');
          if (chainring > 0 && cog > 0) setVal('gearText', `${fmt(chainring, 0)}/${fmt(cog, 0)}`);
        }
        calculatePower();
      });
      el.addEventListener('change', calculatePower);
    });

    calculatePower();
