#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Ghost {
    #[key]
    pub id: felt252,
    pub lane: u16,
    pub pos: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub range: u16,
    pub target: felt252,
}

#[generate_trait]
impl GhostImpl of GhostTrait {
    fn new_test(id: felt252) -> Ghost {
        Ghost {
            id,
            lane: 3,
            pos: 0,
            typ: 0,
            health: 100,
            attack: 50,
            rate: 1,
            range: 10,
            target: 0,
        }
    }
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Turret {
    #[key]
    pub id: felt252,
    pub lane: u16,
    pub pos: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub vel: u16,
    pub target: felt252,
}


#[derive(Copy, Drop, Introspect, Serde)]
pub enum DefenderType {
    None,
    Tower,
}


#[derive(Copy, Drop, Introspect, Serde)]
pub enum AttackerType {
    None,
    WhiteGhost,
}

#[generate_trait]
impl TurretImpl of TurretTrait {
    fn new_test(id: felt252) -> Turret {
        Turret {
            id,
            lane: 3,
            pos: 10,
            typ: 0,
            health: 100,
            attack: 50,
            rate: 1,
            vel: 1,
            target: 0,
        }
    }
}

#[derive(Clone, Drop, Serde)]
#[dojo::model]
pub struct Session {
    #[key]
    pub player: starknet::ContractAddress,
    pub ghosts: Array<felt252>,
    pub turrets: Array<felt252>,
    pub level: u8,
    pub ectoplasm: u32,
}
