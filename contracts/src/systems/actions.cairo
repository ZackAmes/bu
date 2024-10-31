
#[starknet::interface]
trait IActions<T> {
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions};
    use starknet::{ContractAddress, get_caller_address};
    use bu::models::{Turret, Ghost, Session};

  

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
    }
        
}

