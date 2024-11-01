#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Ghost {
    #[key]
    pub id: u32,
    pub column: u16,
    pub row: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub vel_x: u16,
    pub target: u32,
}

#[generate_trait]
impl GhostImpl of GhostTrait {
    fn new_test(id: u32) -> Ghost {
        Ghost {
            id,
            column: 3,
            row: 10,
            typ: 0,
            health: 100,
            attack: 50,
            vel_x: 1,
            target: 0,
            rate: 1,
        }
    }
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Turret {
    #[key]
    pub id: u32,
    pub column: u16,
    pub row: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub range: u16,
    pub target: u32,
}

#[generate_trait]
impl TurretImpl of TurretTrait {
    fn new_test(id: u32) -> Turret {
        Turret {
            id,
            column: 3,
            row: 0,
            typ: 0,
            health: 100,
            attack: 50,
            rate: 1,
            range: 10,
            target: 0,
        }
    }
}

#[derive(Clone, Drop, Serde)]
#[dojo::model]
pub struct Session {
    #[key]
    pub player: starknet::ContractAddress,
    pub ghosts: Array<u32>,
    pub turrets: Array<u32>,
    pub level: u8,
    pub ectoplasm: u32,
}
