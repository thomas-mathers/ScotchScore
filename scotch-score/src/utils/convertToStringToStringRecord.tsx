function convertToStringToStringRecord(object: object): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(object)) {
    if (value) {
      record[key] = String(value);
    }
  }
  return record;
}

export default convertToStringToStringRecord;
