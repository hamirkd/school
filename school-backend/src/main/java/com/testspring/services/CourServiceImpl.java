package com.testspring.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.testspring.models.Cour;
import com.testspring.models.User;
import com.testspring.repositories.CourRepository;

@Service
@Transactional

public class CourServiceImpl implements CourService {

	@Autowired
	CourRepository courRepository;


	@Override
	public Cour creerCour(Cour cour) {
		// TODO Auto-generated method stub
		return courRepository.save(cour);
	}

	@Override
	public Cour modifierCour(String id,Cour cour) {
		// TODO Auto-generated method stub
		return courRepository.findById(id)
                .map(courData -> {
                	courData.setCour(cour);
                    Cour updatedCour = courRepository.save(courData);
                    return ResponseEntity.ok().body(updatedCour);
                }).orElse(ResponseEntity.notFound().build()).getBody();
	}

	@Override
	public Cour supprimerCour(String id) {
		// TODO Auto-generated method stub
		return courRepository.findById(id)
				.map(cour->{
					courRepository.deleteById(id);
					return ResponseEntity.ok().body(cour);
					}).orElse(ResponseEntity.notFound().build()).getBody();
	}

	@Override
	public Cour rechercherCourId(String id) {
		return courRepository.findById(id).map(cour -> ResponseEntity.ok().body(cour))
				.orElse(ResponseEntity.notFound().build()).getBody();
	}

	@Override
	public List<Cour> findCours(String titre) {
		return courRepository.findByTitre(titre);
	}
	
	@Override
	public boolean deleteAllCoursOfUser(User user) {
		courRepository.deleteAll(courRepository.findByUser(user));
		return true;
	}
	@Override
	public List<Cour> listeDeTousLesCoursPublic() {
		return courRepository.findByVisibilite(true);
	}
	@Override
	public List<Cour> listCoursPublicSort(Sort sortBy) {
		// TODO Auto-generated method stub
		return courRepository.findByVisibiliteIsTrue(sortBy);
	}
	


}
