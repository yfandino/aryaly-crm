import React, { createContext, useReducer } from "react";

type Action = {
  type: "select" | "selectAll" | "unselect" | "unselectAll";
  payload?: number;
};
type Dispatch = (action: Action) => void;
type Selected = number[];
type SelectableProviderProps = { children: React.ReactNode };

const SelectableContext = createContext<
  {selected: Selected; dispatch: Dispatch} | undefined
>(undefined);
export default SelectableContext;

export function selectableReducer(selected: Selected, action: Action) {
  switch (action.type) {
    case 'select': {
      return [...selected, action.payload];
    }
    case 'selectAll': {
      return Array.from({ length: action.payload }, (_, i) => i);
    }
    case 'unselect': {
      const position = selected.indexOf(action.payload);
      selected.splice(position, 1);
      return [...selected];
    }
    case 'unselectAll': {
      return [];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function SelectableProvider({ children }: SelectableProviderProps) {
  const [selected, dispatch] = useReducer(selectableReducer, []);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { selected, dispatch }

  return (
    <SelectableContext.Provider value={value}>
      {children}
    </SelectableContext.Provider>
  );
}

export function useSelectable() {
  const context = React.useContext(SelectableContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context

}