import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F2FF",
  },

  // Barra de navegação
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1B4F72",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  navTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  // Conteúdo principal
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Cabeçalho da campanha
  campaignHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 5,
  },

  campaignTitle: {
    fontSize: width < 375 ? 26 : 32,
    fontWeight: "900",
    color: "#1B4F72",
    textAlign: "left",
    letterSpacing: 0.8,
    textShadowColor: "rgba(27, 79, 114, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    flex: 1,
  },

  playerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498DB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
  },

  playerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 4,
  },

  // Botão toggle
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#D6EAF8",
    shadowColor: "#1B4F72",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  toggleButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B4F72",
    letterSpacing: 0.3,
  },

  // Seção da história
  storySection: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1B4F72",
    marginBottom: 15,
    letterSpacing: 0.5,
    textAlign: "center",
  },

storyIntro: {
  fontSize: 14,
  fontWeight: "800",
  color: "#1B4F72",
  lineHeight: 23,
  marginBottom: 16,
  textAlign: "left",
  letterSpacing: 0.4,
  fontStyle: "italic",
  paddingVertical: 14,
  paddingHorizontal: 18,
  backgroundColor: "rgba(52, 152, 219, 0.08)",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "rgba(52, 152, 219, 0.3)",
  textShadowColor: "rgba(27, 79, 114, 0.1)",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,
},
  storyParagraph: {
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 20,
    marginBottom: 10,
    textAlign: "justify",
  },

  // Cards de informações
  rulesCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#1B4F72",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#3498DB",
  },

  missionsCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#1B4F72",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#2ECC71",
  },

  battleCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#1B4F72",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#E74C3C",
  },

  // Itens das regras
  ruleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingVertical: 5,
  },

  ruleText: {
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 18,
    marginLeft: 10,
    flex: 1,
  },

  // Itens das missões
  missionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 3,
  },

  missionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3498DB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  missionNumber: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  missionText: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },

  // Descrição da batalha
  battleDescription: {
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 20,
    marginBottom: 12,
    textAlign: "justify",
    fontStyle: "italic",
  },

  mechanicItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingVertical: 2,
  },

  mechanicText: {
    fontSize: 13,
    color: "#2C3E50",
    lineHeight: 17,
    marginLeft: 8,
    flex: 1,
  },

  // Cabeçalho dos locais
  locationsHeader: {
    alignItems: "center",
    marginBottom: 15,
  },

  locationsSubtitle: {
    fontSize: 14,
    color: "#3498DB",
    textAlign: "center",
    fontWeight: "500",
    marginTop: -5,
  },

  roomsContainer: {
    marginBottom: 20,
  },

  roomButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#1B4F72",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#D6EAF8",
  },

  roomButtonIcon: {
    backgroundColor: "#3498DB",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  roomButtonText: {
    fontSize: 17,
    color: "#1B4F72",
    fontWeight: "600",
    flex: 1,
    letterSpacing: 0.3,
  },

  // Botão criar campanha
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#E6F2FF",
    borderTopWidth: 1,
    borderTopColor: "#D6EAF8",
  },

  createButton: {
    backgroundColor: "#1B4F72",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#1B4F72",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
    letterSpacing: 0.5,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(27, 79, 114, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    elevation: 10,
  },

  modalScroll: {
    maxHeight: "90%",
  },

  modalHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "#D6EAF8",
    paddingBottom: 15,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1B4F72",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  section: {
    marginBottom: 20,
  },

  modalSection: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3498DB",
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  modalText: {
    fontSize: 15,
    color: "#2C3E50",
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 10,
  },

  modalBullet: {
    fontSize: 14,
    color: "#2C3E50",
    lineHeight: 20,
    marginLeft: 5,
    marginBottom: 5,
  },

  modalClose: {
    backgroundColor: "#3498DB",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#3498DB",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  modalCloseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  bottomSpacing: {
    height: 20,
  },
});