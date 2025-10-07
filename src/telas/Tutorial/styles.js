import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
  },
  pager: {
    flex: 1,
    width: '100%',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '60%',
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#1B4F72',
    fontWeight: '600',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: '#2295D1',
    textAlign: 'center',
    marginTop: 5,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  homeButtonContainer: {
    position: 'absolute',
    bottom: 60, // mesma altura das setas
    alignSelf: 'center',
  },
  homeButton: {
    backgroundColor: '#2295D1',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2295D1',
  },
  activeIndicator: {
    backgroundColor: '#2295D1',
  },
});
