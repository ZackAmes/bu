use bu::models::{Turret, Ghost};

#[derive(Drop, Serde)]
pub struct GameState {
    pub turrets: Array<Turret>,
    pub ghosts: Array<Ghost>,
    pub tick: u16,
}
