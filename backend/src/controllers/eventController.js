const diffEvent = (before, after) => {
  const changes = {};

  if (before.timezone !== after.timezone) {
    changes.timezone = {
      before: before.timezone,
      after: after.timezone,
    };
  }

  if (before.startUtc.toISOString() !== after.startUtc.toISOString()) {
    changes.start = {
      before: before.startUtc,
      after: after.startUtc,
    };
  }

  if (before.endUtc.toISOString() !== after.endUtc.toISOString()) {
    changes.end = {
      before: before.endUtc,
      after: after.endUtc,
    };
  }

  return changes;
};
