import { overridableComponent } from "@dojoengine/recs";
import type { ContractComponents } from "./typescript/models.gen";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
  contractComponents,
}: {
  contractComponents: ContractComponents;
}) {
  return {
    ...contractComponents,
    Turret: overridableComponent(contractComponents.Turret),
    Ghost: overridableComponent(contractComponents.Ghost),
    Session: overridableComponent(contractComponents.Session),
  };
}
