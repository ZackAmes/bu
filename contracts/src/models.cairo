#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Ghost {
    #[key]
    pub id: u32,
    pub x: u16,
    pub y: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub vel_x: u16,
    pub target: u32,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Turret {
    #[key]
    pub id: u32,
    pub x: u16,
    pub y: u16,
    pub typ: u8,
    pub health: u16,
    pub attack: u16,
    pub rate: u16,
    pub range: u16,
    pub target: u32,
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
