use bu::types::{GameState};
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
    fn get_state(self: @T, tick: u16) -> GameState;
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions};
    use starknet::{ContractAddress, get_caller_address};
    use bu::models::{Turret, Ghost, Session, TurretTrait, GhostTrait};
    use bu::types::{GameState};
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;

    #[storage]
    struct Storage {
        nonce: felt252,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {

        fn spawn(ref self: ContractState) {
            let mut world = self.world(@"bu");
            let player = get_caller_address();


            let mut session: Session = world.read_model(player);
            assert!(session.level ==0, "Session already spawned");

            session.level =1;

            let turret_id = uuid(ref self);
            let ghost_id = uuid(ref self);

            session.turrets.append(turret_id);
            session.ghosts.append(ghost_id);

            let turret = TurretTrait::new_test(turret_id);
            let ghost = GhostTrait::new_test(ghost_id);

            world.write_model(@turret);
            world.write_model(@ghost);
            world.write_model(@session);

            
        }

        fn get_state(self: @ContractState, tick: u16) -> GameState {
            let world = self.world(@"bu");
            let caller = get_caller_address();

            let mut session: Session = world.read_model(caller).clone();

            let mut turrets: Array<Turret> = ArrayTrait::new();
            let mut ghosts: Array<Ghost> = ArrayTrait::new();

            for turret_id in session.turrets {
                let turret: Turret = world.read_model(turret_id);
                turrets.append(turret);
            };

            for ghost_id in session.ghosts {
                let ghost: Ghost = world.read_model(ghost_id);
                ghosts.append(ghost);
            };

            let state = GameState {
                turrets,
                ghosts,
                tick,
            };

            state
        }
    }

    fn uuid(ref self: ContractState) -> felt252 {
        let current = self.nonce.read();
        self.nonce.write(current + 1);
        current
    }
}

