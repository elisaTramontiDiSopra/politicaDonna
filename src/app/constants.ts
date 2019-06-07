export const ApiBaseUrl: string = 'http://localhost:3000';
declare const PRODUCTION;
export const TranslationsUrl = PRODUCTION ? '' : 'http://localhost:3000';

export const FVG_URLS = [   //PUT THE BALLOTTING *****BEFORE****
  ['https://www.dati.friuliveneziagiulia.it/resource/wd3h-ri8p.json', '2016b'], // 2016 giugno ballott
  ['https://www.dati.friuliveneziagiulia.it/resource/xb7f-igun.json', '2016'],  // 2016 giugno
  ['https://www.dati.friuliveneziagiulia.it/resource/qkr8-4tgx.json', '2016b'], // 2016 ottobre ballott
  ['https://www.dati.friuliveneziagiulia.it/resource/i7cd-5stk.json', '2016'],  // 2016 ottobre
  ['https://www.dati.friuliveneziagiulia.it/resource/b6a8-hmkz.json', '2017b'], // 2017 ballott
  ['https://www.dati.friuliveneziagiulia.it/resource/b6a8-hmkz.json', '2017'],  // 2017
  ['https://www.dati.friuliveneziagiulia.it/resource/k3b2-b7ug.json', '2018b'], // 2018 ballott
  ['https://www.dati.friuliveneziagiulia.it/resource/hgsx-b62v.json', '2018']   // 2018
]
