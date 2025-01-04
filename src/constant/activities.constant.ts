export const activities = {
  devices: {
    module: 'devices',
    actions: {
      created: 'device.created',
      updated: 'device.updated',
    },
    created: {
      key: 'activities.devices.created',
    },
    updated: {
      key: 'activities.devices.updated',
    },
  },
  features: {
    subject: '',
    actions: {
      created: 'created',
      updated: 'updated',
      deleted: 'deleted',
      assigned: 'assigned',
    },
    created: {
      key: 'activities.created',
      props: [],
    },
    updated: {
      key: 'activities.updated',
      props: [],
    },
    deleted: {
      key: 'activities.deleted',
      props: [],
    },
    assigned: {
      key: 'activities.assigned',
      props: [],
    },
  },
};

export const toProps = ({ obj, keys }: { obj: any; keys: string[] }) => {
  const object = { ...obj };
  for (const propName in object) {
    if (!keys.includes(propName)) {
      delete object[propName];
    }
  }
  return object;
};

export const paths = {
  'POST::/v1/features': {
    details: activities.features.created,
    subject: activities.features.subject,
    action: activities.features.actions.created,
  },
};

export const toAction = (path): any => {
  for (const iterator in paths) {
    if (!!path.match(iterator)) {
      return paths[iterator];
    }
  }
  return path;
};
