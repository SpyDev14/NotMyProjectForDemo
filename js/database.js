export const COMPONENTS = [
  {
    id: 'cpu-intel-i9-14900k',
    name: 'Intel Core i9-14900K BOX',
    category: 'cpu',
    price: 64990,
    image: 'img/components/cpu-intel-i9.png',
    performanceTier: 5,
    specs: {
      socket: 'LGA1700',
      cores: 24,
      threads: 32,
      powerConsumption: 125
    }
  },
  {
    id: 'cpu-amd-ryzen7-7800x3d',
    name: 'AMD Ryzen 7 7800X3D BOX',
    category: 'cpu',
    price: 46500,
    image: 'img/components/cpu-amd-r7.png',
    performanceTier: 5,
    specs: {
      socket: 'AM5',
      cores: 8,
      threads: 16,
      powerConsumption: 120
    }
  },
  {
    id: 'cpu-intel-i5-13400',
    name: 'Intel Core i5-13400 BOX',
    category: 'cpu',
    price: 21200,
    image: 'img/components/cpu-intel-i5.png',
    performanceTier: 3,
    specs: {
      socket: 'LGA1700',
      cores: 10,
      threads: 16,
      powerConsumption: 65
    }
  },
  {
    id: 'cpu-amd-ryzen5-5600',
    name: 'AMD Ryzen 5 5600 BOX',
    category: 'cpu',
    price: 11800,
    image: 'img/components/cpu-amd-r5.png',
    performanceTier: 3,
    specs: {
      socket: 'AM4',
      cores: 6,
      threads: 12,
      powerConsumption: 65
    }
  },

  {
    id: 'gpu-nvidia-rtx4090',
    name: 'NVIDIA GeForce RTX 4090 24GB',
    category: 'gpu',
    price: 219990,
    image: 'img/components/gpu-rtx4090.png',
    performanceTier: 5,
    specs: {
      vram: 24,
      powerConsumption: 450
    }
  },
  {
    id: 'gpu-amd-rx7800xt',
    name: 'AMD Radeon RX 7800 XT 16GB',
    category: 'gpu',
    price: 59400,
    image: 'img/components/gpu-rx7800xt.png',
    performanceTier: 4,
    specs: {
      vram: 16,
      powerConsumption: 260
    }
  },
  {
    id: 'gpu-nvidia-rtx4060',
    name: 'NVIDIA GeForce RTX 4060 8GB',
    category: 'gpu',
    price: 34500,
    image: 'img/components/gpu-rtx4060.png',
    performanceTier: 3,
    specs: {
      vram: 8,
      powerConsumption: 115
    }
  },
  {
    id: 'gpu-nvidia-gtx1650',
    name: 'NVIDIA GeForce GTX 1650 4GB',
    category: 'gpu',
    price: 14800,
    image: 'img/components/gpu-gtx1650.png',
    performanceTier: 1,
    specs: {
      vram: 4,
      powerConsumption: 75
    }
  },

  {
    id: 'mb-asus-rog-z790',
    name: 'ASUS ROG STRIX Z790-E GAMING WIFI',
    category: 'motherboard',
    price: 47900,
    image: 'img/components/mb-asus-z790.png',
    performanceTier: 5,
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      formFactor: 'ATX'
    }
  },
  {
    id: 'mb-msi-mag-b650',
    name: 'MSI MAG B650 TOMAHAWK WIFI',
    category: 'motherboard',
    price: 23600,
    image: 'img/components/mb-msi-b650.png',
    performanceTier: 4,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'ATX'
    }
  },
  {
    id: 'mb-gigabyte-b550m',
    name: 'GIGABYTE B550M AORUS ELITE',
    category: 'motherboard',
    price: 10900,
    image: 'img/components/mb-gigabyte-b550m.png',
    performanceTier: 3,
    specs: {
      socket: 'AM4',
      chipset: 'B550',
      formFactor: 'Micro-ATX'
    }
  },

  {
    id: 'ram-kingston-fury-32gb',
    name: 'Kingston FURY Beast DDR5 32GB (2x16GB) 6000MHz',
    category: 'ram',
    price: 13900,
    image: 'img/components/ram-kingston-32gb.png',
    performanceTier: 4,
    specs: {
      capacity: '32 ГБ'
    }
  },
  {
    id: 'ram-gskill-aegis-16gb',
    name: 'G.Skill AEGIS DDR4 16GB (2x8GB) 3200MHz',
    category: 'ram',
    price: 4200,
    image: 'img/components/ram-gskill-16gb.png',
    performanceTier: 2,
    specs: {
      capacity: '16 ГБ'
    }
  },

  {
    id: 'ssd-samsung-980pro-1tb',
    name: 'Samsung 980 PRO M.2 NVMe 1TB',
    category: 'ssd-nvme',
    price: 12400,
    image: 'img/components/ssd-samsung-1tb.png',
    performanceTier: 5,
    specs: {
      capacity: '1 ТБ'
    }
  },
  {
    id: 'ssd-kingston-nv2-500gb',
    name: 'Kingston NV2 M.2 NVMe 500GB',
    category: 'ssd-nvme',
    price: 4600,
    image: 'img/components/ssd-kingston-500gb.png',
    performanceTier: 2,
    specs: {
      capacity: '500 ГБ'
    }
  },

  {
    id: 'ssd-crucial-bx500-1tb',
    name: 'Crucial BX500 SATA3 1TB',
    category: 'ssd-sata',
    price: 7200,
    image: 'img/components/ssd-crucial-1tb.png',
    performanceTier: 2,
    specs: {
      capacity: '1 ТБ'
    }
  },
  {
    id: 'ssd-kingston-a400-240gb',
    name: 'Kingston A400 SATA3 240GB',
    category: 'ssd-sata',
    price: 2800,
    image: 'img/components/ssd-kingston-240gb.png',
    performanceTier: 1,
    specs: {
      capacity: '240 ГБ'
    }
  },

  {
    id: 'hdd-wd-blue-2tb',
    name: 'Western Digital WD Blue 2TB 7200rpm',
    category: 'hdd',
    price: 6800,
    image: 'img/components/hdd-wd-2tb.png',
    performanceTier: 2,
    specs: {
      capacity: '2 ТБ'
    }
  },
  {
    id: 'hdd-seagate-barracuda-1tb',
    name: 'Seagate BarraCuda 1TB 7200rpm',
    category: 'hdd',
    price: 4900,
    image: 'img/components/hdd-seagate-1tb.png',
    performanceTier: 1,
    specs: {
      capacity: '1 ТБ'
    }
  }
];

export const READY_BUILDS = [
  {
    id: 'build-cyber-ultimate',
    name: 'Киберпанк Флагман Pro',
    price: 358900,
    image: 'img/builds/pc-ultimate.png',
    description: 'Бескомпромиссная мощность для гейминга в 4K разрешении на ультра-настройках, стриминга и сложного рендеринга.',
    performanceTier: 5,
    componentsInBuild: [
      'cpu-intel-i9-14900k',
      'gpu-nvidia-rtx4090',
      'mb-asus-rog-z790',
      'ram-kingston-fury-32gb',
      'ssd-samsung-980pro-1tb'
    ]
  },
  {
    id: 'build-amd-advanced',
    name: 'AMD Gaming Evolution',
    price: 155200,
    image: 'img/builds/pc-advanced.png',
    description: 'Прогрессивная игровая станция на актуальном сокете AM5. Идеальный баланс для Quad HD (2K) гейминга.',
    performanceTier: 4,
    componentsInBuild: [
      'cpu-amd-ryzen7-7800x3d',
      'gpu-amd-rx7800xt',
      'mb-msi-mag-b650',
      'ram-kingston-fury-32gb',
      'ssd-samsung-980pro-1tb'
    ]
  },
  {
    id: 'build-optimal-gaming',
    name: 'Народный Баланс v2',
    price: 81100,
    image: 'img/builds/pc-optimal.png',
    description: 'Оптимальный выбор для комфортного Full HD гейминга в современные AAA-тайтлы и киберспортивные дисциплины.',
    performanceTier: 3,
    componentsInBuild: [
      'cpu-amd-ryzen5-5600',
      'gpu-nvidia-rtx4060',
      'mb-gigabyte-b550m',
      'ram-gskill-aegis-16gb',
      'ssd-kingston-nv2-500gb'
    ]
  }
];
