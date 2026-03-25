# Dashboard Avatar Spec

## Overview

Replace the dummy avatar section at the sidebar most low part with the data from the database. If there's no user, just print "Guest" as the name. Also add the `cog` icon button beside the name as show on the screenshot.

## Requirements

- Create apps/app/src/lib/db/users.ts with data fetching functions
- Fetch collections directly in server component
- Display user name, icon must be the first letter of the name.
- `cog` icon button beside which is clickable.


## References

Check the `@context/screenshots/dashboard-ui-main.png` screenshot if needed, but layout and design is already there.
