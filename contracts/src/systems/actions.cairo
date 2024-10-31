
#[starknet::interface]
trait IActions<T> {
    fn spawn(ref self: T);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions};
    use starknet::{ContractAddress, get_caller_address};
    use bu::models::{Turret, Ghost, Session};
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;

    #[storage]
    struct Storage {
        nonce: usize,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {

        fn spawn(ref self: ContractState) {
            let mut world = self.world(@"bu");
            let player = get_caller_address();


            let mut session: Session = world.read_model(player);
            assert!(session.level ==0, "Session already spawned");

            session.level =1;

            world.write_model(@session);
            let turret_id = uuid(ref self);
            let ghost_id = uuid(ref self);

        }
    }

    fn uuid(ref self: ContractState) -> usize {
        let current = self.nonce.read();
        self.nonce.write(current + 1);
        current
    }
}

