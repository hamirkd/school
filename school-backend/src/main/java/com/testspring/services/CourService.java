package com.testspring.services;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.testspring.models.Cour;
import com.testspring.models.User;

public interface CourService {

	public List<Cour> listeDeTousLesCoursPublic();

	public List<Cour> listCoursPublicSort(Sort sortBy);

	public Cour creerCour(Cour cour);

	public Cour modifierCour(String id, Cour cour);

	public Cour supprimerCour(String id);

	public boolean deleteAllCoursOfUser(User user);

	public Cour rechercherCourId(String id);
	
	public List<Cour> findCours(String titre);
	//public List<Cour> listeDeSesCours(String userId);
}
