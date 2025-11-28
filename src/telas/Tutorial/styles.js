import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  pager: {
    flex: 1,
    width: '100%',
  },
  
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: height * 0.35,
  },
  
  // Botão voltar - minimalista
  homeBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  
  // Card de conteúdo - limpo e simples
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    marginHorizontal: 8,
    width: width * 0.9,
    maxHeight: height * 0.55,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  smallContentCard: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: width * 0.92,
    maxHeight: height * 0.6,
  },
  
  largeContentCard: {
    paddingHorizontal: 28,
    paddingVertical: 32,
    width: width * 0.85,
    maxHeight: height * 0.5,
  },
  
  // ---- TIPOGRAFIA MINIMALISTA ----
  title: {
    fontSize: isSmallScreen ? 20 : 24,
    color: '#1a365d',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 26 : 30,
  },
  
  smallTitle: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 14,
  },
  
  largeTitle: {
    fontSize: 26,
    lineHeight: 32,
  },
  
  subtitle: {
    fontSize: isSmallScreen ? 16 : 18,
    color: '#2295D1',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: isSmallScreen ? 20 : 22,
  },
  
  smallSubtitle: {
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 16,
  },
  
  text: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: isSmallScreen ? 20 : 22,
    fontWeight: '400',
  },
  
  smallText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  
  textObs: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: isSmallScreen ? 16 : 18,
    fontStyle: 'italic',
  },
  
  smallTextObs: {
    fontSize: 11,
    lineHeight: 15,
  },
  
  // ---- TÓPICOS MINIMALISTAS ----
  topicsContainer: {
    width: '100%',
    marginBottom: 8,
  },
  
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(34, 149, 209, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(34, 149, 209, 0.1)',
  },
  
  smallTopicItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 6,
  },
  
  topicText: {
    fontSize: isSmallScreen ? 13 : 15,
    color: '#2295D1',
    flex: 1,
    textAlign: 'left',
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 8,
  },
  
  smallTopicText: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  
  // ---- BOTÕES SIMPLES ----
  campainButton: {
    backgroundColor: '#2295D1',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    marginTop: 12,
    minWidth: 180,
  },
  
  smallCampainButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    minWidth: 160,
  },
  
  homeButton: {
    backgroundColor: '#2295D1',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  
  homeButtonText: {
    color: 'white',
    fontSize: isSmallScreen ? 16 : 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  smallHomeButtonText: {
    fontSize: 15,
  },
  
  // ---- LINK SIMPLES ----
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  
  smallLinkButton: {
    marginTop: 10,
  },
  
  linkText: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#2295D1',
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 4,
  },
  
  smallLinkText: {
    fontSize: 13,
  },
  
  // ---- NAVEGAÇÃO LIMPA ----
  arrowContainer: {
    position: 'absolute',
    bottom: height * 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: width * 0.1,
  },
  
  homeButtonContainer: {
    position: 'absolute',
    bottom: height * 0.1,
    alignSelf: 'center',
  },
  
  // ---- INDICADORES DISCRETOS ----
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.05,
    gap: 6,
  },
  
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  
  activeIndicator: {
    backgroundColor: '#2295D1',
  },
  
  inactiveIndicator: {
    backgroundColor: '#cbd5e0',
  },
  
  // ---- IMAGEM DE FUNDO - mantido original ----
  fixedImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height * 0.4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height * 0.4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  
  // ---- MODAL MINIMALISTA ----
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  
  modalScrollView: {
    maxHeight: '85%',
  },
  
  modalTitle: {
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '700',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  modalSection: {
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '600',
    color: '#2295D1',
    marginTop: 16,
    marginBottom: 8,
  },
  
  modalText: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#4a5568',
    textAlign: 'justify',
    lineHeight: isSmallScreen ? 20 : 22,
    marginBottom: 8,
  },
  
  modalBulletText: {
    fontSize: isSmallScreen ? 13 : 14,
    color: '#4a5568',
    lineHeight: isSmallScreen ? 18 : 20,
    marginBottom: 4,
    textAlign: 'left',
  },
  
  modalCloseButton: {
    backgroundColor: '#2295D1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 16,
    alignSelf: 'center',
  },
  
  modalCloseButtonText: {
    color: 'white',
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '600',
  },
});