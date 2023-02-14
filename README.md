# ServisBOT Node Red

To make a change to the node-red runtime being used by K4 avalanche:
1. Checkout from this branch `servisbot-branch`
2. Make changes
3. PR into this branch
4. Merge on approval
5. Manually bump the package version
6. Run `npm run build`
7. Manually publish to NPM with `npm publish` - Request creds from ops for this


# CHANGE-LOG

## 0.18.7-patch-11
2023-02-14
- Added ability to do loop detection

## 0.18.7-patch-10.3
2023-01-03
- Removed subflow ID auto-generation, now prefixes the nodeId with the subflow id

## 0.18.7-patch-10
2021-07-14
- Updated logic to swap back org to correct value when possible
  
## 0.18.7-patch-9.1
2021-07-09
- Bug fix for when retuning a array out of a function node


## 0.18.7-patch-8 
2021-07-08
- Added support to log out when organization variable was changed within function or change node