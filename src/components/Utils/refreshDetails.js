export default function refreshDetails(oldProps, nextProps, action) {
  if (nextProps.selectedCohort !== oldProps.selectedCohort) {
    nextProps[action](nextProps.selectedCohort);
  } else if (nextProps.defaultCohort !== oldProps.defaultCohort) {
    nextProps[action](nextProps.defaultCohort);
  }
}
