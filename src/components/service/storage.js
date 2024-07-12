const serialize = value => {
  return JSON.stringify(value);
};

const deserialize = serializedState => {
  return JSON.parse(serializedState);
};

const save = (key, value) => {
  try {
    const serializedState = serialize(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    throw new Error(
      `Save to localStorage failed for key '${key}': ${error.message}`
    );
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : deserialize(serializedState);
  } catch (error) {
    throw new Error(
      `Load from localStorage failed for key '${key}': ${error.message}`
    );
  }
};

const storage = {
  save,
  load,
};

export default storage;
