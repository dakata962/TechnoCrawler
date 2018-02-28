var text = 'МОБИЛЕН ТЕЛЕФОНSIM: МICRO SIMБАТЕРИЯ: LI-ION 3000 MAHОПЕРАЦИОННА СИСТЕМА : ANDROID, V4.4.4 (KITKAT)ПРОЦЕСОР: QUAD-CORE 2.7 GHZ KRAIT 450ДИСПЛЕЙ: 5.6 (14.2 СМ) SUPER AMOLED КАПАЦИТИВЕН ДИСПЛЕЙ С 16M. ЦВЯТА, РЕЗОЛЮЦИЯ 1600 X 2560КАМЕРА: 16 МPX КАМЕРА, АВТОМАТИЧЕН ФОКУС, LED СВЕТКАВИЦА, ВТОРА КАМЕРА 3.7 MPвиж повечеПАМЕТ: 32 GB ВГРАДЕНА ПАМЕТ, 3 GB RAMВЪНШНА ПАМЕТ: MICRO SD ДО 128GBРАЗМЕРИ: В/Ш/Д - 151.3/82.4/8.3 MМТЕГЛО: 174';
let gb, cpu;

gb = text.substring(text.indexOf('ПАМЕТ: ') + 7, text.indexOf(' GB') + 3);
cpu = text.substring(text.indexOf('ПРОЦЕСОР: ')+10,text.indexOf('ДИСПЛЕЙ'));
console.log(cpu);